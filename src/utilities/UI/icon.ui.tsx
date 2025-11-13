export function IconUIComponent(props: {
  icon: string;
  className?: string;
  onClick?: Function;
}) {
  const { icon, className, onClick } = props;

  const handleOnclick = () => {
    if (!onClick) return;

    onClick();
  };

  return (
    <i
      onClick={handleOnclick}
      className={`text-primary flex items-center text-3xl ${icon} ${className}`}
    ></i>
  );
}
