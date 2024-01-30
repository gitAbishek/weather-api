import { useFormContext } from "react-hook-form";
import { CiSearch } from "react-icons/ci";

const Search: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className="search-main">
      <div className="search-icon">
        <CiSearch  />
      </div>
      <input
        className="search-input"
        {...register("search")}
        placeholder="Kathmandu"
      />
    </div>
  );
};

export default Search;
