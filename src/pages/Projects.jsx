import React from "react";

const Projects = ({activePopup, onClose }) => {
    const content = {
        netMauiApp: (
            <div>
                <h2>.NET MAUI Mobile Application</h2>
                <p>This mobile application leverages .NET MAUI and Camera.MAUI for real-time QR and barcode scanning, providing users with immediate access to web resources by scanning codes. The app features a dynamic UI, promoting a seamless interaction experience through responsive design and intuitive navigation capabilities.</p>
            </div>
        ),
        interactivePortfolio: (
            <div>
                <h2>3D Interactive Portfolio</h2>
                <p>My portfolio is a unique blend of 3D web development, incorporating Three.js, React, HTML, CSS, and Blender. It features a fully interactive 3D environment, complete with animations and a mini-game. This project not only showcases my skills but also enhances the user experience by making information accessible through engaging, interactive elements.</p>
            </div>
        ),
        securityPlayground: (
            <div>
                <h2>Security Playground: SQL Injections and XSS</h2>
                <p>Designed as an educational tool, this project simulates a secure testing environment where users can experiment with SQL injections and XSS attacks using React and SQLite. Inspired by SQLrand, it implements custom defenses against SQL injections, including a novel use of Caesar ciphers to encrypt sensitive SQL commands, enhancing security across web applications.</p>
            </div>
        ),
        ecommerceIntegration: (
            <div>
                <h2>E-commerce Integration with NetSuite</h2>
                <p>In this project, I developed an e-commerce platform using WordPress and WooCommerce integrated with NetSuite Oracle. The platform includes a custom API that enhances user experience by enabling real-time tracking of orders and automated product updates based on inventory checks, streamlining the shopping process.</p>
            </div>
        ),
        upcomingProject: (
            <div>
                <h2>Upcoming Project: Fitness Application</h2>
                <p>My upcoming project involves creating a machine learning-driven fitness application that personalizes workout and nutrition plans. This application will utilize TensorFlow for its recommendation systems, providing users with tailored fitness and meal plans that evolve based on their individual progress.</p>
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

export default Projects;