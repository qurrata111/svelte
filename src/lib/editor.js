import axios from "axios";

export const getBlogs = async () => {
    console.log("sdasdfasdasd");
    try {
        axios.get('http://localhost:8000/blogs')
        .then((response) => {
            console.log("WTF");
            console.log(response.data);
            return response.data;
        });
    } catch (error) {
      console.log("WTh");
      console.error(error);
    }
};

const options = {
    headers: {'Content-Type': 'application/json'}
};
  
export const uploadImage = async (image) => {
    try {
        axios.post(
            'http://localhost:5000/upload-image', 
            {
                'image': image
            },
            options
        ).then((response) => {
            return response.data;
        });
    } catch (error) {
        console.error(error);
    }
}
