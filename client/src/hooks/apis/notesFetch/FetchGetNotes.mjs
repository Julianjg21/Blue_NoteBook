import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";

const FetchGetNotes = () => {
  const [getNotes, setGetNotes] = useState([]); //Status for notes
  const [loading, setLoading] = useState(true); //Loading status
  const [error, setError] = useState(null); //Error status

  //Function to get the notes from the API
  const handleGetNotes = async () => {
    const userData = JSON.parse(Cookies.get("userData")); //Get user data
    const user_id = userData.id; //Extract the user ID

    try {
      setLoading(true); //Start loading state

      const getData = await axios.get(API_ROUTES.getNotes, {
        params: { user_id }, //Pass user_id as parameter
      });

      setGetNotes(getData.data.notes); //Update notes
      setError(null); //Reset error on success
    } catch (error) {
      setError(error.response ? error.response.data : error.message); //Save error
    } finally {
      setLoading(false); //End loading status
    }
  };

  
  //Returns notes, loading status, error and a refresh function
  return { getNotes, loading, error, refreshNotes: handleGetNotes };
};

export default FetchGetNotes;
