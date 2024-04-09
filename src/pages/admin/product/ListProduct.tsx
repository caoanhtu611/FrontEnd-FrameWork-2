import { useEffect, useState } from "react";
import { deleteProduct, getProduct } from "../../../service/product";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListProductAdmin = () => {
  const [product, setProduct] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const navigate = useNavigate();

  const getAll = async () => {
    try {
      let skip = page !== 0 ? (page - 1) * limit : 0;
      let data: any = await getProduct({ page: skip, limit });
      if (data?.status === 0) {
        setTotalPage(Math.ceil(data.count / data.size));
        setProduct(data.data);
      } else {
        let data: any = await getProduct({ page: skip - 1, limit });
        if (data?.status === 0) {
          setTotalPage(Math.ceil(data.count / data.size));
          setProduct(data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAll();
  }, [page]);
  const handleChangePage = (page: any) => {
    setPage(page);
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    setPage(page - 1);
  };
  const handleDelete = async (id: any) => {
    try {
      if (confirm("Do you want to delete?")) {
        let data = await deleteProduct(id);
        if (data?.status === 0) {
          toast.success("Success");
          getAll();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        onClick={() => navigate(`/dashboard/addproduct`)}
        className="focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 me-2 mb-2 dark:focus:ring-blue-900"
      >
        Add Product
      </button>
      <div className=" w-[1150px]  bg-gray-100 mt-[20px]">
        <div className="container max-w-screen-lg mx-auto">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {product &&
                  product.length &&
                  product.map((item: any) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.title}
                        </th>
                        <td className="px-6 py-4">
                          <img
                            src={item.image[0]}
                            width={50}
                            height={50}
                            alt=""
                          />
                        </td>
                        <td className="px-6 py-4">${item.price}</td>
                        <td className="px-6 py-4">{item.categoryId.name}</td>
                        <td className="px-6 py-4 text-right flex gap-1">
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/dashboard/editproduct/${item._id}`)
                            }
                            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-2 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {totalPage === 0 ? (
        ""
      ) : (
        <nav
          className="mt-[20px] "
          style={{ display: "flex", justifyContent: "center" }}
          aria-label="Page navigation example "
        >
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li
              style={
                page <= 1
                  ? { pointerEvents: "none", opacity: 0.5 }
                  : { pointerEvents: "all", opacity: 1 }
              }
            >
              <p
                onClick={handlePrevPage}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </p>
            </li>
            {[...Array(totalPage)].map((_, index) => {
              console.log(index === page);
              return (
                <li>
                  <p
                    onClick={() => handleChangePage(index + 1)}
                    className={
                      index !== page - 1
                        ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        : "z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    }
                  >
                    {index + 1}
                  </p>
                </li>
              );
            })}
            <li
              style={
                page == totalPage
                  ? { pointerEvents: "none", opacity: 0.5 }
                  : { pointerEvents: "all", opacity: 1 }
              }
            >
              <p
                onClick={handleNextPage}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </p>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default ListProductAdmin;
