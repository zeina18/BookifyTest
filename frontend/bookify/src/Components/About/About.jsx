import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './about.module.css';
import { ArrowLeft } from 'lucide-react'; // Import ArrowLeft icon

function About() {
  const navigate = useNavigate(); // Hook for navigation

  const handleBackClick = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <>
      <Navbar />
      <button 
            className={styles.backButton}
            onClick={handleBackClick}
            aria-label="Back to Home"
          >
            <ArrowLeft className={styles.backIcon} />
          </button>
      <div className="container">
        {/* About Section */}
        <section className={styles.aboutSection}>
          <div className={styles.hero}>
            <h1 className={styles.heroTitle}>About Bookify</h1>
          </div>
          <div className={styles.content}>
            <div className={styles.card}>
              <h2 className={styles.title}>Who We Are</h2>
              <p className={styles.text}>
                Welcome to Bookify, your all-in-one platform for seamless event and activity reservations! Created by a passionate team of students from the Faculty of Computers and Information Technology at Future University in Egypt, Bookify is designed to transform the way you plan and book experiences—whether it’s a city tour, a football match, or a night at the cinema.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.subtitle}>Our Vision</h3>
              <p className={styles.text}>
                At Bookify, we believe planning should be as enjoyable as the experience itself. Our mission is to simplify the booking process by offering a user-friendly platform that brings a wide range of activities right to your fingertips...
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.subtitle}>What Sets Us Apart</h3>
              <ul className={styles.list}>
                <li><strong>Convenience:</strong> Book everything in one place.</li>
                <li><strong>Immersion:</strong> Explore with 360-degree videos.</li>
                <li><strong>Simplicity:</strong> Intuitive navigation.</li>
                <li><strong>Variety:</strong> Diverse events with real-time updates.</li>
              </ul>
            </div>

            <div className={styles.card}>
              <h3 className={styles.subtitle}>Our Team</h3>
              <p className={styles.text}>
                Bookify is the result of a collaborative effort by Digital Media Department students.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.subtitle}>Why Bookify?</h3>
              <p className={styles.text}>
                Whether you’re planning a spontaneous day out or a long-awaited trip, Bookify is your trusted companion...
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection}>
          <h2 className={styles.title}>Get in Touch</h2>
          <p className={styles.text}>
            Have questions or feedback? We’re here to help every step of the way!
          </p>

          <div className={styles.grid}>
            <div className={styles.contactInfo}>
              <h3 className={styles.subtitle}>Contact Us</h3>
              <ul className={styles.list}>
                <li>
                  <strong>Email:</strong>{' '}
                  <a href="#" className={styles.link}>
                    support@bookifyfue.com
                  </a>
                </li>
                <li><strong>Phone:</strong> +20 123 456 7890</li>
                <li><strong>Address:</strong> Future University in Egypt, New Cairo</li>
              </ul>

              <h3 className={styles.subtitle}>Connect With Us</h3>
              <div className={styles.socialIcons}>
                <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <svg className={styles.socialIcon} viewBox="0 0 24 24" aria-label="Twitter">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                
                <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <svg className={styles.socialIcon} viewBox="0 0 24 24" aria-label="Instagram">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                
                <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <svg className={styles.socialIcon} viewBox="0 0 24 24" aria-label="Facebook">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.subtitle}>Send Us a Message</h3>
              <form className={styles.form}>
                <input type="text" placeholder="Your Name" className={styles.input} />
                <input type="email" placeholder="Your Email" className={styles.input} />
                <textarea placeholder="Your Message" className={styles.textarea}></textarea>
                <button type="submit" className={styles.button}>Send</button>
              </form>
            </div>
          </div>

          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.123456789!2d31.445617!3d30.025123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583e5e5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2sFuture%20University%20in%20Egypt!5e0!3m2!1sen!2seg!4v1234567890123"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default About;