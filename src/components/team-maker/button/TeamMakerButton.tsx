type ButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

const TeamMakerButton = ({ label, onClick, disabled = false }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-sky-500 hover:bg-sky-600 cursor-pointer p-2 mt-4 disabled:opacity-50 disabled:hover:bg-sky-500 rounded-md text-white font-bold transition-color disabled:cursor-not-allowed"
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default TeamMakerButton;
