// app/components/Welcome.tsx
interface WelcomeProps {
    title: string;
    subtitle: string;
  }
  
  const Welcome: React.FC<WelcomeProps> = ({ title, subtitle }) => {
    return (
      <div className="welcome-container">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    );
  };
  
  export default Welcome;
  