import { FaLocationDot } from "react-icons/fa6";

const iconColor = {
  'departure': "#3476AB",
  'destination': "#AB3434",
}

const Location = ({type, location}) => {
  return (
    <div className="flex gap-1 items-center text-sm font-medium ">
      <FaLocationDot color={iconColor[type]} />
      {location}
    </div>
  );
}

export default Location;