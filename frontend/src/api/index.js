import apiClient from "./client";

/**
 *
 * @param {{name:string, email:string, password:string, phone:string}} param0
 * @returns {Promise<{status:number, text:string, data:any}>}
 * @throws {{error:boolean, status:number, message:string}}
 */
export async function createTeacher({ name, email, password, phone }) {
  try {
    const resp = await apiClient.post("/teacher", {
      name,
      email,
      password,
      phone,
    });
    return {
      status: resp.status,
      text: resp.statusText,
      data: resp.data?.response,
    };
  } catch (error) {
    throw {
      error: true,
      status: error.response?.status,
      message: "something went wrong",
    };
  }
}

/**
 *
 * @param {{email:string, password:string}} param0
 * @returns {Promise<{status:number, text:string, data:any}>}
 * @throws {{error:boolean, status:number, message:string}}
 */
export async function login({ email, password }) {
  try {
    const resp = await apiClient.post("/auth/login", { email, password });
    return {
      status: resp.status,
      text: resp.statusText,
      data: resp.data?.response,
    };
  } catch (error) {
    throw {
      error: true,
      status: error.response?.status,
      message: "something went wrong",
    };
  }
}

/**
 *
 * @returns {Promise<{status:number, text:string, data:{id:number, name:string, email:string, phone:string, role:string, created_at:Date, updated_at:Date}}>}
 * @throws {{error:boolean, status:number, message:string}}
 */
export async function getCurrentTeacherDetails() {
  try {
    const resp = await apiClient.get("/teacher/me");
    const user = resp.data?.response?.data?.user;
    return {
      status: resp.status,
      text: resp.statusText,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    };
  } catch (error) {
    throw {
      error: true,
      status: error.response?.status,
      message: "something went wrong",
    };
  }
}

/**
 *
 * @param {{email:string, password:string}} param0
 * @returns {Promise<{status:number, text:string}>}
 * @throws {{error:boolean, status:number, message:string}}
 */
export async function logout() {
  try {
    const resp = await apiClient.post("/auth/logout");
    return {
      status: resp.status,
      text: resp.statusText,
    };
  } catch (error) {
    throw {
      error: true,
      status: error.response?.status,
      message: "something went wrong",
    };
  }
}
