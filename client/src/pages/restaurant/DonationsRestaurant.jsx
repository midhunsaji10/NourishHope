import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import NavBar from '../../components/navbar/NavBar';

export default function DonationsRestaurant() {
    const [donations, setDonations] = useState([]);
    const [donationId, setDonationId] = useState('');
    const [donatedQuantity, setDonatedQuantity] = useState('');
    const [assignQuantity, setAssignQuantity] = useState('');
    const [orphanageRequest, setOrphanageRequest] = useState([]);
    const [foodType, setFoodType] = useState('');
    const [requestId, setRequestId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const handleFoodType = (value) => {
        setFoodType(value);
    }
    console.log(orphanageRequest, foodType, donationId, donatedQuantity, assignQuantity);

    const [login_id, setLogin_id] = useState(localStorage.getItem('loginId'));
    useEffect(() => {
        axios.get(`http://localhost:5000/api/rest/list_donations/${login_id}`)
            .then(res => {
                setDonations(res.data.data)
            });
        axios.get(`http://localhost:5000/api/orphanage/all-requests/`)
            .then(res => {
                setOrphanageRequest(res.data.data)
            });
    }, [login_id])

    const handleDonation = (id) => {
        setRequestId(id);
        setShowModal(true);


    }

    const processDonation = (e) => {
        e.preventDefault();
        const data = {
            requestId: requestId,
            quantity: assignQuantity,
        }
        console.log(data);
        
        axios.put(`http://localhost:5000/api/user/assign_donation/${donationId}`, data)
            .then(res => {
                console.log(res);   
                toast.success(res.data.Message);
                setShowModal(false);
                window.location.reload();
            }).catch(err => {
                toast.error(err.response.data.Message)
            })
    }


    const handleAssign = (id) => {
        setDonationId(id)
    }
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {/* Top Bar Start */}
            <div className="top-bar d-none d-md-block">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="top-bar-left">
                                <div className="text">
                                    <i className="fa fa-phone-alt" />
                                    <p>+123 456 7890</p>
                                </div>
                                <div className="text">
                                    <i className="fa fa-envelope" />
                                    <p>info@example.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="top-bar-right">
                                <div className="social">
                                    <a href="">
                                        <i className="fab fa-twitter" />
                                    </a>
                                    <a href="">
                                        <i className="fab fa-facebook-f" />
                                    </a>
                                    <a href="">
                                        <i className="fab fa-linkedin-in" />
                                    </a>
                                    <a href="">
                                        <i className="fab fa-instagram" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Top Bar End */}
            {/* Nav Bar Start */}
            <NavBar />
            {/* Nav Bar End */}
            {/* Page Header Start */}
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Donations</h2>
                        </div>
                        <div className="col-12">
                            <a href="">Home</a>
                            <a href="">Donations</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Header End */}
            {/* Single Post Start*/}
            <div className="event">
                <div className="container">
                    {foodType == '' && donationId == '' ?
                        <div className="row">
                            {donations.map((donation) => (
                                <div className="col-lg-6">
                                    <div className="event-item">

                                        <div className="event-content">
                                            <div className="event-meta">
                                                <p style={{ textWrap: 'auto' }}>
                                                    <i className="fa fa-user" />
                                                    {donation.user?.name}
                                                </p>
                                                <p style={{ textWrap: 'auto' }}>
                                                    <i className="fa fa-mobile-alt" />
                                                    {donation.user?.mobile}
                                                </p>
                                                <p style={{ textWrap: 'auto' }}>
                                                    <i className="far fa-envelope" />
                                                    {donation.user?.email}
                                                </p>

                                            </div>
                                            <div className="event-text">
                                                <h3>{donation.food_type}</h3>
                                                <p>
                                                    Items Donated : {donation.quantity}
                                                </p>
                                                <p>
                                                    Status : {donation.status}
                                                </p>
                                                <p>
                                                    Date: {new Date(donation.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                                                </p>

                                                <a className="btn btn-custom btn-primary text-white" onClick={() => { handleAssign(donation._id), handleFoodType(donation.food_type), setDonatedQuantity(donation.quantity) }}>
                                                    Assign
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }


                        </div> :

                        <div className="row">
                            {orphanageRequest.filter((data) => { return data.food_type === foodType }).map((donation) => (
                                <div className="col-lg-5">
                                    <div className="event-item">
                                        <img src={donation?.orphanage_id?.orphanage_images[0]} alt="Image" />
                                        <div className="event-content">
                                            <div className="event-meta" style={{ justifyContent: 'center' }}>
                                                <p style={{ textWrap: 'auto' }}>
                                                    <i className="fa fa-mobile-alt" />
                                                    {donation.orphanage_id?.mobile}
                                                </p>
                                                <p style={{ textWrap: 'auto' }}>
                                                    <i className="far fa-envelope" />
                                                    {donation.orphanage_id?.email}
                                                </p>
                                                <p style={{ textWrap: 'auto' }}>
                                                    <i className="fa fa-map-marker-alt" />
                                                    {donation.orphanage_id?.address}
                                                </p>

                                            </div>
                                            <div className="event-text">
                                                <h3>{donation.orphanage_id?.orphanage_name}</h3>
                                                <p>
                                                    Requsted : {donation.requested_quantity}
                                                </p>
                                                <p>
                                                    Status : {donation.status}
                                                </p>
                                                <p>
                                                    Date: {new Date(donation.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                                                </p>

                                                <a className="btn btn-custom btn-primary text-white" onClick={() => { handleDonation(donation._id) }}>
                                                    Donate
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }


                        </div>
                    }






                    {/* <div className="col-lg-5">
                        <div className="donate-form">
                            <form onSubmit=''>
                               
                                <div className="control-group">
                                    <select
                                        className="form-control"
                                        
                                    >
                                        <option value="">Select Food Type</option>
                                            <option style={{color:'black'}} value="Non Veg">Non veg</option>
                                            <option style={{color:'black'}} value="Veg">Veg</option>
                                        

                                    </select>

                                </div>

                                <div className="control-group mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="No of donations"
                                        
                                        
                                      
                                       
                                        required
                                    />
                                </div>

                                <div>
                                    <button className="btn btn-custom btn-primary" type="submit">
                                        Donate Now
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div> */}
                </div>
            </div>
            {/* Single Post End*/}
            {/* Footer Start */}
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-contact">
                                <h2>Our Head Office</h2>
                                <p>
                                    <i className="fa fa-map-marker-alt" />
                                    123 Street, New York, USA
                                </p>
                                <p>
                                    <i className="fa fa-phone-alt" />
                                    +012 345 67890
                                </p>
                                <p>
                                    <i className="fa fa-envelope" />
                                    info@example.com
                                </p>
                                <div className="footer-social">
                                    <a className="btn btn-custom" href="">
                                        <i className="fab fa-twitter" />
                                    </a>
                                    <a className="btn btn-custom" href="">
                                        <i className="fab fa-facebook-f" />
                                    </a>
                                    <a className="btn btn-custom" href="">
                                        <i className="fab fa-youtube" />
                                    </a>
                                    <a className="btn btn-custom" href="">
                                        <i className="fab fa-instagram" />
                                    </a>
                                    <a className="btn btn-custom" href="">
                                        <i className="fab fa-linkedin-in" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-link">
                                <h2>Popular Links</h2>
                                <a href="">About Us</a>
                                <a href="">Contact Us</a>
                                <a href="">Popular Causes</a>
                                <a href="">Upcoming Events</a>
                                <a href="">Latest Blog</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-link">
                                <h2>Useful Links</h2>
                                <a href="">Terms of use</a>
                                <a href="">Privacy policy</a>
                                <a href="">Cookies</a>
                                <a href="">Help</a>
                                <a href="">FQAs</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-newsletter">
                                <h2>Newsletter</h2>
                                <form>
                                    <input className="form-control" placeholder="Email goes here" />
                                    <button className="btn btn-custom">Submit</button>
                                    <label>Don't worry, we don't spam!</label>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


                {showModal && (
                    <div
                        className="modal show"
                        tabIndex="-1"
                        style={{
                            display: "block",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Donate</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ><b>X</b></button>
                                </div>
                                <div className="modal-body text-center">

                                    <form onSubmit={processDonation}>
                                        <div className="form-group">
                                            <label htmlFor="donations">set quantity</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="donations"
                                                name="donations"
                                                // value={donations}
                                                onChange={(e) => { setAssignQuantity(e.target.value) }}
                                                required
                                            />
                                        </div>
                                        <button type='submit'>donate</button>
                                    </form>

                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}



                <div className="container copyright">
                    <div className="row">
                        <div className="col-md-6">
                            <p>
                                © <a href="#">Your Site Name</a>, All Right Reserved.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                Designed By <a href="https://htmlcodex.com">HTML Codex</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer End */}
        </>
    )
}
