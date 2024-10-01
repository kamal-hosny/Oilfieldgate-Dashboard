// react
import React, { useCallback, useEffect } from "react";
// mui icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
// react-redux hooks and actions
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../store/category/act/actGetAllCategories";
// Modal
import { openModal } from "../store/modal/modalSlice";
import Loading from "../components/UI/Loading";
import withGuard from "../util/withGuard";

// Component for Card Content
const CardContent = React.memo(({ title, items }) => {
  const dispatch = useDispatch();

  // Handlers for opening modals with memoization to prevent re-creation on every render
  const handleAdd = useCallback(
    () => dispatch(openModal({ name: "AddSpecific", type: title })),
    [dispatch]
  );
  const handleEdit = useCallback(
    (item) => () =>
      dispatch(openModal({ name: "EditSpecific", product: item, type: title })),
    [dispatch]
  );
  const handleDelete = useCallback(
    (item) => () =>
      dispatch(openModal({ name: "DeleteSpecific", product: item, type: title })),
    [dispatch]
  ); // wrap in a function to delay execution until click

  return (
    <div className="card border-2 border-colorBorder  bg-sectionColor h-fit p-2 rounded-md flex flex-col gap-4">
      <div className="header-specific flex justify-between items-center">
        <h2 className="text-colorText1 font-medium">{title}</h2>
        <span className="text-colorText2 cursor-pointer">
          <AddIcon fontSize="small" onClick={handleAdd} />
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div className="flex justify-between text-colorText2" key={index}>
            <p className="text-sm">{item.name}</p>
            <div className="icons flex items-center gap-1">
              <EditIcon
                fontSize="small"
                style={{ cursor: "pointer" }}
                onClick={handleEdit(item)}
              />
              <DeleteOutlineIcon
                fontSize="small"
                onClick={handleDelete(item)} // Now correctly delayed until clicked
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

const CreateSpecific = () => {
  // Select necessary data from Redux store
  const { allCategories, allBrands, allConditions, allMaterialCategories } =
    useSelector((state) => ({
      allCategories: state?.allCategories?.records?.data,
      allBrands: state?.allBrands?.records?.data,
      allConditions: state?.allConditions?.records?.data,
      allMaterialCategories: state?.allMaterialCategories?.records?.data,
    }));

    const {loading , error} = useSelector((state) => state?.allBrands)

  return (
    <Loading classStyle="h-screen" className="" loading={loading} error={error} >
    <div className="flex flex-col gap-4">
      <h1>All Specific</h1>
      <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardContent title="Category" items={allCategories || []} />
        <CardContent
          title="Material Category"
          items={allMaterialCategories || []}
        />
        <CardContent title="Brand" items={allBrands || []} />
        <CardContent title="Condition" items={allConditions || []} />
      </div>
    </div>
    </Loading>
  );
};

export default withGuard(React.memo(CreateSpecific));


  