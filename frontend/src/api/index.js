import apiClient from "./client";

/**
 *
 * @returns {Promise<boolean>}
 */
export async function checkHealth() {
  try {
    await apiClient.get("/_health");
    return true;
  } catch (error) {
    return false;
  }
}

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
      data: user,
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
 * @returns {Promise<{status:number, text:string, data:string}}>}
 * @throws {{error:boolean, status:number, message:string}}
 */
export async function getAuthToken() {
  try {
    const resp = await apiClient.get("/auth/token");
    const token = resp.data?.response?.data?.auth_token;
    return token;
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
 * @returns {Promise<{status:number, text:string, data:{id:number, title:string, subject:string, is_negative_marking:boolean, no_of_questions:number, status:string, share_code:string, total_submissions:number, duration:number, questions:{id:number, options:string[], problem:string, created_at:Date, updated_at:Date}[], created_at:Date, updated_at:Date}[]}>}
 * @throws {{error:boolean, status:number, message:string}}
 */
export async function getTeacherQuizzes() {
  try {
    const resp = await apiClient.get("/teacher/quizzes");
    const data = resp.data?.response?.data;
    return {
      status: resp.status,
      text: resp.statusText,
      data: data,
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

/**
 *
 * @param {{title:string, subject:string, no_of_questions:number, duration:number, questions:{problem:string, options:string[], correct_answer:number}[]}} param0
 * @returns {Promise<{status:number, text:string, data:string}>}
 * @throws {{error:boolean, status:number, message:string}}
 */
export async function createQuiz({
  title,
  subject,
  no_of_questions,
  duration,
  questions,
}) {
  try {
    const resp = await apiClient.post("/quiz/new", {
      title,
      subject,
      no_of_questions,
      duration,
      questions,
    });
    return {
      status: resp.status,
      text: resp.statusText,
      data: resp.data?.response?.data?.share_code,
    };
  } catch (error) {
    console.log("API ERROR: ", error);
    throw {
      error: true,
      status: error.response?.status,
      message: "something went wrong",
    };
  }
}
