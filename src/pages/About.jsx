import React from "react";

const About = ({ activePopup, onClose }) => {
  const content = {
    aboutMe: (
      <div>
        <h2>About Me</h2>
        <p>Hey, my Name is Eric Xiao, and I am currently a student-athlete at Brandeis University, where I am pursuing a Bachelor of Science in Computer Science with a minor in Economics. With a keen interest in Data Science and Machine Learning, I am eager to explore opportunities that allow me to merge my analytical skills with practical applications to make impactful contributions to the field of computer science.</p>
        <p>College Station, TX, 77845</p>
        <p>(979) 985 - 1001</p>
        <p>eric.xiao312@gmail.com</p>
        <a href="https://leetcode.com/u/exiao312/" target="_blank" rel="noopener noreferrer">LeetCode</a>
        <a href="https://github.com/ericX08" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/ericxiao-cs/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    ),
    experience: (
      <div>
        <h2>Experience</h2>
        <h3>Arbin Instruments, College Station, TX — Software Engineer Intern</h3>
        <p>May 2023 - August 2023</p>
        <ul>
          <li>[Frontend] Website Design: Responsible for the development of interactive and responsive website pages and components, utilizing React for dynamic user interfaces, along with HTML and CSS for structural layout and style definition</li>
          <li>[Backend] Application Features:
            <ul>
              <li>Developed a software feature for sophisticated SQL data filtering and visualization, using C# and Python to create custom variables and present data effectively.</li>
              <li>Designed a feature for cloning PDF files and converting them into Word format, enhancing document management and editing capabilities.</li>
            </ul>
          </li>
        </ul>
        <h3>Arbin Instruments, College Station, TX — Software Engineer Intern</h3>
        <p>May 2024 - August 2024</p>
        <ul>
          <li>Designed and implemented an API to integrate with NetSuite Oracle, facilitating access to business data including sales orders, products, shipping dates, and serial numbers.</li>
          <li>Developed a comprehensive website that enhances customer experience by enabling users to track order statuses, initiate support tickets, and execute purchases directly through the platform.</li>
        </ul>
      </div>
    ),
    education: (
      <div>
        <h2>Education</h2>
        <h3>Brandeis University — Pursuing a BS</h3>
        <p>August 2022 - December 2025: Waltham, MA</p>
        <p>Planned Major: Major in Computer Science, Minor in Economics.</p>
        <p>GPA: 3.7/4.0</p>
        <p>Relevant Courses: Intro to Python, Advanced Programming Techniques in Java, Discrete Structures, Microeconomic Theory, Applied Linear Algebra, Data Structures, Intro to Computer Security, Macroeconomic Theory</p>
        <h3>A&M Consolidated High School — High School Diploma</h3>
        <p>August 2018 - May 2022: College Station TX</p>
        <p>Graduated Summa Cum Laude</p>
        <h3>Activity</h3>
        <p><strong>Student Athlete - Brandeis University Varsity Swimming</strong></p>
        <p>August 2022 - Present</p>
        <ul>
          <li>Exhibited discipline by consistently committing to every practice.</li>
          <li>Enhanced team performance by guiding teammates in strengthening techniques through communication.</li>
        </ul>
        <h3>Honors and Awards</h3>
        <ul>
          <li>Four Years University Merit Scholarship, Brandeis University 2022-2026</li>
          <li>Dean's List, Brandeis University 2023,2024</li>
        </ul>
      </div>
    )
  };

  if (!activePopup) return null;

  return (
    <div style={{ padding: '20px' }}>
      {content[activePopup]}
      <button 
        onClick={onClose}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Close
      </button>
    </div>
  );
};

export default About;