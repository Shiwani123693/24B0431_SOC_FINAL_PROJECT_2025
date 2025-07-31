import React, { Suspense, useRef, useState } from "react";
import emailjs from '@emailjs/browser'
import { Canvas } from "@react-three/fiber";
import { Fox } from "../models/Fox";
import useAlert from "../hooks/useAlert";
import Alert from "../component/Alert";


const Contact = () => {


  const formRef=useRef(null)
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation]=useState('idle')
  const {alert,showAlert,hideAlert}=useAlert()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit=(e) =>{
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('hit')
    emailjs.send(
       import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "24b0431@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
     
    ).then(()=>{
      setIsLoading(false)
      showAlert({show:true,text:'Message sent Successfully',type:'success'})
      setTimeout(()=>{
        hideAlert();
        setCurrentAnimation('idle')
      setForm({name:"",email:"",message:""})},[3000])

    }).catch((error)=>{
      setIsLoading(false)
      setCurrentAnimation('idle')
      console.log(error)
       showAlert({show:true,text:'I didnt receive your message',type:'danger'})
    })

  };

  const handleFocus = () => setCurrentAnimation('walk');
  const handleBlur = () => setCurrentAnimation('idle');

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert}></Alert>}
      
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="sm:text-5xl text-3xl font-semibold sm:leading-snug font-poppins">
          Get in Touch
        </h1>

        <form className="w-full flex flex-col gap-7 mt-14">
          <label className="text-black-500 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Shiwani"
            required
            value={form.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <label className="text-black-500 font-semibold">E-mail</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Shiwani@gmail.com"
            required
            value={form.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <label className="text-black-500 font-semibold">Your Message</label>
          <textarea
            name="message"
            className="textarea"
            placeholder="Let me know how I can help you!"
            required
            value={form.message}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <button
            type="submit"
            className="btn"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmit={handleSubmit}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]"  >
      <Canvas
       camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
          
      >
        <directionalLight intensity={2.5} position={[0,0,1]}></directionalLight>
        <ambientLight  intensity={0.5}></ambientLight>
        <Suspense fallback={null} >
          <Fox currentAnimation={currentAnimation}
          position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
          
          ></Fox>
        </Suspense>
      </Canvas>
      </div>
    </section>
  );
};

export default Contact;
