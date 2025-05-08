import style from "./TagItem.module.css";

interface TagItemProps {
  name: string;
  color: string;
}

const TagItem = ({ name, color }: TagItemProps) => {
  return (
    <div className={style.tagContainer}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0.4rem"
        height="0.4rem"
        viewBox="0 0 4 4"
        fill={color}
      >
        <circle cx="2" cy="2" r="2" fill={color} />
      </svg>
      <div className={style.tagName}>{name}</div>
    </div>
  );
};

export default TagItem;
