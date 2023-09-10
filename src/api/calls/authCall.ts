import api from "..";

export const loginUser = async (data: object) => {
     return await api.post("/user/login", data);
};

export const getUserData = async (company_id: string | null) => {
     return await api.get(
          `/user${company_id ? `?company_id=${company_id}` : ""}`
     );
};
