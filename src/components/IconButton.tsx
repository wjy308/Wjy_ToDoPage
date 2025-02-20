import React from "react";

interface IconButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  className?: string; // 스타일을 덮어쓸 수 있게 추가
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  className = "",
}) => {
  return (
    <button
      className={`text-black w-5 h-5 border border-transparent hover:border-black transition-all ${className}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
