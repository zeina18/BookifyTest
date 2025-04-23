import React, { useState } from "react";
import styles from "./Chatbot.module.css";
import { FaRobot, FaTimes, FaLanguage } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
const Chatbot = () => {
  // Language content with project-specific questions
  const content = {
    en: {
      welcome: "Welcome to Bookify! How can I assist with your bookings today?",
      defaultResponse:
        "For more complex inquiries, please visit our help center.",
      questions: {
        "Book cinema tickets":
          "You can book movie tickets through our Movies section.",
        "Upcoming events":
          "We have concerts, exhibitions and more! Check our Events page for details.",
        "Football match tickets":
          "All sports tickets including football matches are available in Sports section.",
        "Available trips":
          "We offer amazing trips! Visit our Trips page to explore destinations.",
        "Cancel my booking":
          "Please go to My Account > Bookings to manage your reservations.",
      },
      you: "You",
      bot: "Bookify Bot",
      chooseLanguage: "Language",
      close: "Close",
    },
    ar: {
      welcome: "مرحبًا بكم في Bookify! كيف يمكنني مساعدتك في حجوزاتك اليوم؟",
      defaultResponse:
        "للحصول على إجابات أكثر تفصيلاً، يرجى زيارة مركز المساعدة.",
      questions: {
        "حجز تذاكر السينما": "يمكنك حجز تذاكر الأفلام من قسم الأفلام. ",
        "الفعاليات القادمة":
          "لدينا حفلات ومعارض وغيرها! تحقق من صفحة الفعاليات لمزيد من التفاصيل.",
        "تذاكر مباريات كرة القدم":
          "جميع تذاكر الأحداث الرياضية بما في ذلك مباريات كرة القدم متوفرة في قسم الرياضة. ",
        "الرحلات المتاحة":
          "نقدم رحلات رائعة! قم بزيارة صفحة الرحلات لاستكشاف الوجهات.",
        "إلغاء حجز": "يرجى الذهاب إلى حسابي > الحجوزات لإدارة حجوزاتك.",
      },
      you: "أنت",
      bot: "بوت Bookify",
      chooseLanguage: "اللغة",
      close: "إغلاق",
    },
  };

  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const sendMessage = (userText) => {
    // Add user message
    const newMessages = [
      ...messages,
      {
        sender: "user",
        text: userText,
      },
    ];
    setMessages(newMessages);

    // Add bot response after a short delay
    setTimeout(() => {
      const botResponse =
        content[language].questions[userText] ||
        content[language].defaultResponse;
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botResponse,
        },
      ]);
    }, 500);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowLanguageSelector(false);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setMessages([]);
    setShowLanguageSelector(false);
  };

  return (
    <>
      {!isOpen && (
        <button className={styles.chatToggle} onClick={toggleChat}>
          <div className={styles.botIconContainer}>
            <FaQuestionCircle className={styles.botIcon} />
            <span className={styles.botPulse}></span>
          </div>
          <span className={styles.helpText}>Need help?</span>
        </button>
      )}

      {isOpen && (
        <div
          className={`${styles.chatContainer} ${
            language === "ar" ? styles.rtl : ""
          }`}
        >
          <div className={styles.chatHeader}>
            <button
              className={styles.languageButton}
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
            >
              <FaLanguage />
              {language === "en" ? "العربية" : "English"}
            </button>
            <div className={styles.headerTitle}>{content[language].bot}</div>
            <button className={styles.closeButton} onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>

          {showLanguageSelector && (
            <div className={styles.languageSelector}>
              <button
                className={`${styles.langOption} ${
                  language === "en" ? styles.active : ""
                }`}
                onClick={() => changeLanguage("en")}
              >
                English
              </button>
              <button
                className={`${styles.langOption} ${
                  language === "ar" ? styles.active : ""
                }`}
                onClick={() => changeLanguage("ar")}
              >
                العربية
              </button>
            </div>
          )}

          <div className={styles.chatMessages}>
            {messages.length === 0 && (
              <div className={styles.welcomeMessage}>
                <FaRobot className={styles.welcomeIcon} />
                {content[language].welcome}
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  message.sender === "user"
                    ? styles.userMessage
                    : styles.botMessage
                }`}
              >
                <div className={styles.senderName}>
                  {message.sender === "user"
                    ? content[language].you
                    : content[language].bot}
                </div>
                <div className={styles.messageText}>{message.text}</div>
              </div>
            ))}
          </div>

          <div className={styles.quickQuestions}>
            {Object.keys(content[language].questions).map((question, index) => (
              <button
                key={index}
                className={styles.quickQuestion}
                onClick={() => sendMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
