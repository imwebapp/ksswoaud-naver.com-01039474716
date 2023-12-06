const SuffixIcon = ({ icon, onClick }: { icon?: any; onClick?: any }) => {
  return (
    <div className="absolute flex border border-transparent right-0 top-0 h-full w-fit">
      <div
        onClick={onClick}
        className={
          "flex items-center justify-center rounded-tl rounded-bl z-10 text-gray-600 text-lg h-full w-full"
        }
      >
        {icon}
      </div>
    </div>
  );
};

export default SuffixIcon;
