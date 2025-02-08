import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import NavBar from '../../components/navbar/NavBar';
export default function Feedbacks() {
    const [allFeedbacks, setAllFeedbacks] = useState([]);
    console.log(allFeedbacks);

    const [login_id, setLogin_id] = useState(localStorage.getItem('loginId'));
    useEffect(() => {
        axios.get(`http://localhost:5000/api/rest/viewfeedback`)
            .then(res => {
                const role = localStorage.getItem('role')
                if (role == 'admin') {
                    setAllFeedbacks(res.data.data)
                } else if (role == 'user') {
                    const filterData = res.data.data.filter((item) => item.restaurantId.login_id === login_id);
                    setAllFeedbacks(filterData)
                }else{
                    setAllFeedbacks(res.data.data)
                }
            });
    }, [login_id])
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
                            <h2>Feedback</h2>
                        </div>
                        <div className="col-12">
                            <a href="">Home</a>
                            <a href="">Feedbacks</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Header End */}
            {/* Single Post Start*/}
            <div className="single">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">


                            {allFeedbacks.map((feedback) => (
                                <div className="single-bio">
                                    <div className="single-bio-img">
                                        <i className='fa fa-user-circle fa-2x' style={{ fontSize: '50px' }} />
                                    </div>
                                    <div className="single-bio-text" style={{ position: 'relative' }}>
                                        <h3>{feedback.userLoginId?.username}</h3>
                                        <p>
                                            {feedback.feedbackText}
                                        </p>
                                        <p style={{ position: 'absolute', top: '0', right: '-450px' }}>{new Date(feedback.submittedAt).toLocaleDateString()} <br /> {new Date(feedback.submittedAt).toLocaleTimeString()}</p>

                                    </div>
                                </div>
                            ))}



                        </div>

                    </div>
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
