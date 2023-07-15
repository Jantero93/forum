type SignedInCardProps = { handleLogOutClick: () => void };

const SignedInCard = ({ handleLogOutClick }: SignedInCardProps) => {
  return (
    <div className="px-4">
      <button
        className="px-4 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:text-slate-200 hover:bg-blue-700"
        onClick={handleLogOutClick}
      >
        Log out
      </button>
    </div>
  );
};

export default SignedInCard;
