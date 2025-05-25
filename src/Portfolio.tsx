import React, { useState, useEffect } from 'react';
import ryan from './assets/ryan.jpg';
import { ChevronDown, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, BookOpen, Code, Database, Brain } from 'lucide-react';
import emailjs from 'emailjs-com';

const Portfolio = () => {
  const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
  const USER_ID = process.env.REACT_APP_USER_ID;
  const [activeSection, setActiveSection] = useState('intro');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Replace these with your EmailJS credentials
      const result = await emailjs.send(SERVICE_ID!,TEMPLATE_ID!,{
        from_name: formData.name,
        name: "Ryan",
        message: formData.message,
        from_email: formData.email,
        },
        USER_ID!);

      if (result.status === 200) {
        setSubmitMessage('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setSubmitMessage('Failed to send message. Please try again.');
      console.error('EmailJS Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              Ryan Dsouza
            </div>
            <div className="hidden md:flex space-x-8">
              {['intro', 'about', 'education', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-200 hover:text-blue-400 ${
                    activeSection === section ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {section === 'education' ? 'Academic Journey' : section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Intro Section */}
      <section id="intro" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-pink-600/20"></div>
        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 p-1">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold pb-3 mb-6 bg-gradient-to-r from-white via-blue-200 to-pink-200 bg-clip-text text-transparent">
            Data Scientist & Analyst
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Transforming data into actionable insights with machine learning and statistical analysis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-pink-600 rounded-full hover:from-blue-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border-2 border-blue-400 rounded-full hover:bg-blue-400 hover:text-slate-900 transition-all duration-300 font-semibold"
            >
              Get In Touch
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-blue-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                I'm a passionate data scientist with a strong foundation in statistical analysis, machine learning, and data visualization. 
                My journey in data science began during my undergraduate studies and has evolved through rigorous academic training and hands-on projects.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                I specialize in extracting meaningful insights from complex datasets, building predictive models, and creating data-driven solutions 
                that drive business value. My approach combines technical expertise with creative problem-solving to tackle challenging analytical questions.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-blue-600/30 rounded-full text-sm border border-blue-400/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center">
                <img src={ryan} className='w-full h-96 bg-gradient-to-br from-blue-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
            Academic Journey
          </h2>
          <div className="space-y-8">
            {/* Masters */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Master of Science in Applied Data Science</h3>
                  <p className="text-xl text-blue-400 mb-3">University of Chicago</p>
                  <p className="text-gray-300 mb-4">Currently Pursuing • Expected Graduation: June 2026</p>
                  <p className="text-gray-300 leading-relaxed">
                    Advanced coursework in machine learning, statistical modeling, big data analytics, and applied research methods. 
                    Focus on real-world applications of data science in various industries and research domains.
                  </p>
                </div>
              </div>
            </div>

            {/* Bachelors */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Database className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Bachelor of Science in Data Science</h3>
                  <p className="text-xl text-blue-400 mb-3">DePaul University</p>
                  <p className="text-gray-300 mb-4">Graduated: June 2025</p>
                  <p className="text-gray-300 leading-relaxed">
                    Completed a comprehensive blend of core Computer Science and Data Science coursework. In Computer Science, studied foundational subjects including Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), and Software Engineering Principles. In Data Science, focused on essential analytical and statistical tools, including Machine Learning, Probability and Statistics, Linear and Logistic Regression, SQL for Data Management, and Big Data Mining techniques. This interdisciplinary curriculum provided a strong technical foundation and practical experience in both software development and data-driven problem solving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Job Recommendation System",
                description: "Developed a job recommendation system using collaborative filtering and natural language processing techniques.",
                tech: ["Python", "AWS", "Scikit-learn", "Pyspark"],
                icon: "📈",
                link: "https://github.com/ryantechs-dotcom/LinkedIN_Algorithim"
              },
              {
                title: "Trading System",
                description: "Built a modular trading system using object-oriented programming principles. The system supports multiple trading strategies, order execution, portfolio tracking, and risk management. ",
                tech: ["Java", "OOP", "Software Architecture", " JUnit"],
                icon: "🤖",
                link: "https://github.com/ryantechs-dotcom/Trading_System"
              },
              {
                title: "Credit Card Default Prediction",
                description: "Created risk prediction model for Credict Card defaults using ensemble methods and feature engineering techniques.",
                tech: ["Python", "Random Forest", "XGBoost", "Flask"],
                icon: "💰",
                link: "https://github.com/ryantechs-dotcom/Credit_Card_Approval_Model"
              }
            ].map((project, index) => (
              <div key={index} className="bg-slate-900/50 rounded-2xl p-6 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-4xl mb-4">{project.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-blue-600/20 rounded-full text-xs text-blue-300 border border-blue-400/30">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                    <Github className="w-4 h-4" />
                    <a href={project.link}>Code</a>
                  </button>
                  <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: "Programming Languages",
                skills: [
                  { name: "Python", level: 95 },
                  { name: "R", level: 85 },
                  { name: "SQL", level: 90 },
                  { name: "JavaScript", level: 75 },
                  { name: "Java", level: 70 }
                ],
                icon: <Code className="w-8 h-8" />
              },
              {
                category: "Machine Learning & AI",
                skills: [
                  { name: "Scikit-learn", level: 90 },
                  { name: "TensorFlow", level: 80 },
                  { name: "PyTorch", level: 75 },
                  { name: "Keras", level: 60 },
                  { name: "XGBoost", level: 88 }
                ],
                icon: <Brain className="w-8 h-8" />
              },
              {
                category: "Data Tools & Platforms",
                skills: [
                  { name: "Pandas", level: 95 },
                  { name: "NumPy", level: 92 },
                  { name: "Tableau", level: 85 },
                  { name: "Power BI", level: 80 },
                  { name: "Apache Spark", level: 70 }
                ],
                icon: <Database className="w-8 h-8" />
              }
            ].map((category, index) => (
              <div key={index} className="bg-slate-800/50 rounded-2xl p-6 border border-purple-400/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-purple-400">{category.icon}</div>
                  <h3 className="text-xl font-bold text-white">{category.category}</h3>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between">
                      <span className="text-gray-300">{skill.name}</span>
                      <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm always interested in discussing new opportunities, collaborating on data science projects, or chatting about the latest trends in machine learning and analytics.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-purple-400" />
                  <span className="text-gray-300">your.email@example.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-purple-400" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-purple-400" />
                  <span className="text-gray-300">Chicago, IL</span>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <Github className="w-6 h-6" />
                </button>
                <button className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-purple-400/20">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Your Message"
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-400 text-white resize-none placeholder-gray-400"
                  ></textarea>
                </div>
                {submitMessage && (
                  <div className={`p-3 rounded-lg text-center ${
                    submitMessage.includes('successfully') 
                      ? 'bg-green-600/20 text-green-300 border border-green-500/30' 
                      : 'bg-red-600/20 text-red-300 border border-red-500/30'
                  }`}>
                    {submitMessage}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 Ryan Dsouza. Built with React & TypeScript.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;