import { useEffect, useState } from "react";
import {
  addProduct,
  getOneProduct,
  getProduct,
  updateProduct,
} from "../../../service/product";
import { getCategory } from "../../../service/category";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const schema = yup.object({
  title: yup.string().required(),
  price: yup.number().required(),
  description: yup.string().required(),
  image1: yup.string().required(),
  image2: yup.string().required(),
  image3: yup.string().required(),
  image4: yup.string().required(),
  categoryId: yup.string().required(),
});
const EditProduct = () => {
  const [category, setCategory] = useState([]);
  const [productEdit, setProductEdit] = useState<any>({});
  const [image, setImage] = useState([]);

  const [imageUrl, setImageUrl] = useState<Record<string, string>>({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });
  const [messageImage, setMessageImage] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { id } = useParams();

  const navigate = useNavigate();

  const getAll = async () => {
    try {
      let dataEdit = await getOneProduct(id);
      let data = await getCategory();
      if (data?.status === 0) {
        setCategory(data.data);
      }
      if (dataEdit?.status == 0) {
        setProductEdit(dataEdit.data);
        reset(dataEdit.data);
        setValue("categoryId", dataEdit.data.categoryId._id);
        let object: any = {};
        dataEdit.data.image.map((item: any, index: number) => {
          object = { ...object, [`image${index + 1}`]: item };
        });
        setImageUrl(object);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAll();
  }, []);

  const onSubmit = async (value: any) => {
    try {
      let url = "";
      let keyImage = "";
      let arr = [];
      for (let [key, value] of Object.entries(image)) {
        if (value[0]) {
          const formData = new FormData();
          formData.append("file", value[0]);
          formData.append("upload_preset", "dmwgp0bx");
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/djz8utyvm/image/upload",
            formData
          );
          if (response.status == 200) {
            keyImage = key;
            url = response.data.url;
            setImageUrl((prevState) => ({
              ...prevState,
              [key]: response.data.url,
            }));
          }
        }
      }
      for (let [key, value] of Object.entries(imageUrl)) {
        if (key === keyImage) {
          arr.push(url);
        } else {
          arr.push(value);
        }
      }

      console.log(arr);

      let data = {
        title: value.title,
        price: value.price,
        description: value.description,
        categoryId: value.categoryId,
        image: arr,
        _id: productEdit._id,
      };
      let res = await updateProduct(data);
      if (res?.status === 0) {
        toast.success("Success");
        setTimeout(() => {
          navigate("/dashboard/listproduct");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(imageUrl);
  const handleChangeImage = (event: any, type: string) => {
    setMessageImage((prevState) => ({ ...prevState, [type]: "" }));
    setImage({ ...image, [type]: event.target.files });
    const file = event.target.files[0];
    const reader: any = new FileReader();
    reader.onload = () => {
      setImageUrl({ ...imageUrl, [type]: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className=" w-[1150px]  bg-gray-100 mt-[20px]">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Title</label>
                    <input
                      type="text"
                      {...register("title")}
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                    />
                    <p style={{ color: "red", margin: 0 }}>
                      {errors.title?.message}
                    </p>
                  </div>
                  <div className="md:col-span-5 flex gap-2">
                    <div>
                      <div className="form-group__file">
                        <label htmlFor="imageUpload" className="file-label">
                          Image
                        </label>
                        <div className="file-wrapper">
                          <input
                            type="file"
                            {...register("image1")}
                            name="imageUpload"
                            onChange={(e) => handleChangeImage(e, "image1")}
                            id="imageUpload"
                            className="file-input"
                          />
                          <div className="file-preview-background">
                            Upload Image
                          </div>
                          <img
                            src={imageUrl.image1}
                            id="imagePreview"
                            width="200px"
                            className="file-preview"
                            alt=".."
                          />
                          <div></div>
                        </div>
                      </div>
                      <p style={{ color: "red", margin: 0 }}>
                        {messageImage.image1 != "" ? messageImage.image1 : ""}
                      </p>
                    </div>
                    <div>
                      <div className="flex gap-2">
                        <div>
                          <div className="form-group__file">
                            <div className="file-wrapper">
                              <input
                                type="file"
                                {...register("image2")}
                                name="imageUpload"
                                onChange={(e) => handleChangeImage(e, "image2")}
                                id="imageUpload"
                                className="file-input"
                              />
                              <div className="file-preview-background">
                                Upload Image
                              </div>
                              <img
                                src={imageUrl.image2}
                                id="imagePreview"
                                width="200px"
                                className="file-preview"
                                alt=".."
                              />
                              <div></div>
                            </div>
                          </div>
                          <p style={{ color: "red", margin: 0 }}>
                            {messageImage.image2 != ""
                              ? messageImage.image2
                              : ""}
                          </p>
                        </div>

                        <div>
                          <div className="form-group__file">
                            <div className="file-wrapper">
                              <input
                                type="file"
                                {...register("image3")}
                                name="imageUpload"
                                onChange={(e) => handleChangeImage(e, "image3")}
                                id="imageUpload"
                                className="file-input"
                              />
                              <div className="file-preview-background">
                                Upload Image
                              </div>
                              <img
                                src={imageUrl.image3}
                                id="imagePreview"
                                width="200px"
                                className="file-preview"
                                alt=".."
                              />
                              <div></div>
                            </div>
                          </div>
                          <p style={{ color: "red", margin: 0 }}>
                            {messageImage.image3 != ""
                              ? messageImage.image3
                              : ""}
                          </p>
                        </div>

                        <div>
                          <div className="form-group__file">
                            <div className="file-wrapper">
                              <input
                                type="file"
                                {...register("image4")}
                                name="imageUpload"
                                onChange={(e) => handleChangeImage(e, "image4")}
                                id="imageUpload"
                                className="file-input"
                              />
                              <div className="file-preview-background">
                                Upload Image
                              </div>
                              <img
                                src={imageUrl.image4}
                                id="imagePreview"
                                width="200px"
                                className="file-preview"
                                alt=".."
                              />
                              <div></div>
                            </div>
                          </div>
                          <p style={{ color: "red", margin: 0 }}>
                            {messageImage.image4 != ""
                              ? messageImage.image4
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <label htmlFor="address">Price</label>
                    <input
                      type="number"
                      {...register("price")}
                      id="address"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                      placeholder=""
                    />
                    <p style={{ color: "red", margin: 0 }}>
                      {errors.price?.message}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="city">Desc</label>
                    <input
                      type="text"
                      {...register("description")}
                      id="city"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                      placeholder=""
                    />
                    <p style={{ color: "red", margin: 0 }}>
                      {errors.description?.message}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="country">Category</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <select
                        id="countries"
                        {...register("categoryId")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected>Choose a Category</option>
                        {category &&
                          category.length &&
                          category.map((item: any) => {
                            return (
                              <option value={item._id}>{item.name}</option>
                            );
                          })}
                      </select>
                      <p style={{ color: "red", margin: 0 }}>
                        {errors.categoryId?.message}
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <a
            href="https://www.buymeacoffee.com/dgauderman"
            target="_blank"
            className="md:absolute bottom-0 right-0 p-4 float-right"
          >
            <img
              src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg"
              alt="Buy Me A Coffee"
              className="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
