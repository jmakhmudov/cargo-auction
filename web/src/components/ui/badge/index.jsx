import { FiAlertTriangle } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";

const dangerIcon = () => (<FiAlertTriangle />);

const daysIcon = () => (<FiCalendar />);

const badgeType = {
  'danger': {
    icon: dangerIcon(),
    color: 'bg-red'
  },
  'days': {
    icon: daysIcon(),
    color: 'bg-blue'
  },
}

const Badge = ({ type, title }) => {
  return (
    <div className={`flex items-center gap-1 w-max px-3 py-1 rounded-md text-white text-xs ${badgeType[type].color}`}>
      {badgeType[type].icon}
      {title}
    </div>
  );
}

export default Badge;