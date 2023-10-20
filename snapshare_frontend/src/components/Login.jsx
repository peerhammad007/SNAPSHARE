import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/newlogowhite.png';

import { client } from '../client';

const Login = () => {

  // const cID = "971190385665-cqp2sl2mbtpsnks3ek6jk35fogv2le3r.apps.googleusercontent.com" 

  // useEffect(() =>{
  //   gapi.load("client:auth2", ()=>{
  //     gapi.auth2.init({cID:cID})
  //   })
  // }, [])
  
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });

    // console.log(response);
    console.log(process.env.REACT_APP_SANITY_PROJECT_ID)

  };

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          className='w-full h-full object-cover'
          src={shareVideo}
          type='video/mp4'
          loop
          controls='false'
          muted
          autoPlay
        />

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} width='130px' alt='"logo' />
          </div>

          <div className='shadow-2xl'>
            <GoogleLogin  
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button 
                  type='button'
                  className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor outline-none'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className='mr-4' /> Sign in with Google
                </button>
              )}

              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login
