import React, { useEffect, useState } from 'react'
import NavBar from '../components/navbar/NavBar'
import axios from 'axios'
import Footer from '../components/navbar/Footer'

export default function Profile() {
    const [role, setRole] = useState(localStorage.getItem('role'))
    const [profile, setProfile] = useState({})
    console.log(profile);
    console.log(role);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/auth/getProfile/${localStorage.getItem('loginId')}/${role}`).then((res) => {
            setProfile(res.data.data)
        })
    }, [role])
    return (
        <>
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
            <div className="page-header" style={{ paddingBottom: '10px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Profile</h2>
                        </div>
                        <div className="col-12">
                            <a href="/">Home</a>
                            <a href="">profile</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Header End */}
            {/* Single Post Start*/}
            <div class="team">
                <div class="container">

                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-md-6">
                            <div class="team-items">
                                <div class="team-img">
                                    {/* <img src="img/team-1.jpg" alt="Team Image"/> */}
                                    <img
                                        src={
                                            role == 'restaurant'
                                                ? profile?.restaurant_images?.[0] 
                                                : role==='orphanage'? profile?.orphanage_images?.[0] : profile?.images?.[0] 
                                        }
                                        alt="Team Image"
                                    />
                                </div>
                                <div class="team-text">
                                    <h2>{role == 'user' ? profile?.name : profile?.restaurant_name}</h2>
                                    <p>{profile?.email}</p>
                                    <div class="team-social">
                                        <a href="" style={{ width: '80%', margin: '10px' }}>+91{profile?.mobile}</a>
                                        <a style={{ width: '80%', margin: '10px' }}>{role=='user'?profile?.login_id?.username:profile?.address}</a>
                                        <a style={{ width: '40%', margin: '10px' }} href="">Edit</a>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            {/* Single Post End*/}
            {/* Footer Start */}
           <Footer/>
            {/* Footer End */}
            {/* Back to top button */}
            <a href="#" className="back-to-top">
                <i className="fa fa-chevron-up" />
            </a>
            {/* Pre Loader */}

            {/* JavaScript Libraries */}
            {/* Contact Javascript File */}
            {/* Template Javascript */}
        </>
    )
}
