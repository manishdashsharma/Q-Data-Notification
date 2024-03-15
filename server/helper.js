import axios from "axios";

const getOrder = async (workspace_id,store_id,date) => {
    try {
        const response = await axios.get("https://www.q.uxlivinglab.online/api/v2/customer-services/", {
            params: {
                type: "retrieve_orders",
                workspace_id: "6385c0f18eca0fb652c94558",
                store_id: "65def89b69bba61416a52f8e",
                date: "2024_02_29"
            },
            headers: {
                Authorization: "Bearer 1b834e07-c68b-4bf6-96dd-ab7cdc62f07f"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export { getOrder };
