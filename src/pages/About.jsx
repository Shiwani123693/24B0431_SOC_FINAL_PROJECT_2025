import { skills } from "../constants";

const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I'm{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          {" "}
          Shiwani
        </span>{" "}
        👋
      </h1>
      <div className="mt-10 flex flex-col gap-3 text-slate-500">
        <p>
          I'm a student at IIT Bombay,  and this project was created using
          Three.js as part of the Summer of Coding. 
        </p>
      </div>
      <div className='py-10 flex flex-col mb-3.5'>
        <h3 className='subhead-text'>My Skills</h3>
        </div>
        <div  className="mt-30 flex flex-wrap gap-12 "  >
            {skills.map((skill) => (
            <div className='block-container w-20 h-20' key={skill.name}>
              <div className='btn-back rounded-xl' />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          ))}
        </div>
       
    </section>
  );
};

export default About;
