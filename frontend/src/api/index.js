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
    if (
      (error.code && error.code === "ERR_NETWORK") ||
      error.code === "ECONNREFUSED" ||
      error.code === "ETIMEDOUT"
    ) {
      return false;
    }
    return true;
  }
}

/**
 *
 * @param {{name:string, email:string, password:string, phone:string}} param0
 * @returns {Promise<{status:number, text:string, data:string}>}
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
      data: resp.data?.response?.data?.auth_token,
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
 * @returns {Promise<{status:number, text:string, data:string}>}
 * @throws {{error:boolean, status:number, message:string}}
 */
export async function login({ email, password }) {
  try {
    const resp = await apiClient.post("/auth/login", { email, password });
    return {
      status: resp.status,
      text: resp.statusText,
      data: resp.data?.response?.data?.auth_token,
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
 *@param {{quiz_id:number}} param0
 * @returns {Promise<{status:number, text:string, data:{id:number, quiz_code:string, name:string, phone:string, district:string, submission_code:string, answers:{id:number, submission_id:number, question_id:number, selected_index:number, is_correct:boolean, created_at:Date, updated_at:Date}[], score:number, created_at:Date, updated_at:Date}[]}>}
 * @throws {{error:boolean, status:number, message:string}}
 */
export async function getQuizSubmissions({ quiz_id }) {
  try {
    const resp = await apiClient.get(`/teacher/quizzes/${quiz_id}/submissions`);
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
    throw {
      error: true,
      status: error.response?.status,
      message: "something went wrong",
    };
  }
}

/**
 *
 * @param {{share_code:string, analysis_mode:boolean}} param0
 * @returns {Promise<{status:number, text:string, data:{id:number, title:string, subject:string, share_code:string, no_of_questions:number, questions:{id:number, options:string[], correct_answer:number, problem:string, created_at:Date, updated_at:Date}[], status:string, duration:number, is_negative_marking:boolean, total_submissions:number, created_at:Date, updated_at:Date}}>}
 * @throws {{error:boolean, status:number, message:string}}
 */
export async function getQuizByCode({ share_code, analysis_mode = false }) {
  try {
    const resp = await apiClient.get("/quiz", {
      params: {
        code: share_code,
        analysis: analysis_mode,
      },
    });
    return {
      status: resp.status,
      text: resp.statusText,
      data: resp.data?.response?.data,
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
 * @param {{name:string, phone:string, district:string, quiz_code:string, time_stamp:number}} param0
 * @returns {Promise<{status:number, text:string, data:{name:string, phone:string, district:string, quiz_code:stirng, time_stamp:number}}>}
 * @throws {{error:boolean, status:number, message:string}}
 */
export async function startQuiz({
  name,
  phone,
  district,
  quiz_code,
  time_stamp,
}) {
  try {
    const resp = await apiClient.post("/student/quiz/start", {
      name,
      phone,
      district,
      quiz_code,
      time_stamp,
    });
    return {
      status: resp.status,
      text: resp.statusText,
      data: resp.data?.response?.data,
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
 * @param {{quiz_code:string, answers: {question_id:number, selected_index:number}[]}} param0
 * @returns {Promise<{status:number, text:string, data:string}>}
 * @throws {{error:boolean, status:number, message:string}}
 */
export async function submitAnswer({ quiz_code, answers }) {
  try {
    const resp = await apiClient.post("/student/quiz/submit", {
      quiz_code: quiz_code,
      answers: answers,
    });
    return {
      status: resp.status,
      text: resp.statusText,
      data: resp.data?.response?.data?.submission_code,
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
 * @returns {Promise<{status:number, text:string, data:{id:number, quiz_code:string, name:string, phone:string, district:string, submission_code:string, answers:{id:number, submission_id:number, question_id:number, selected_index:number, is_correct:boolean, created_at:Date, updated_at:Date}[], score:number, created_at:Date, updated_at:Date}}>}
 * @throws {{error:boolean, status:number, message:string}}
 */
export async function getStudentResult() {
  try {
    const resp = await apiClient.get("/student/result");
    return {
      status: resp.status,
      text: resp.statusText,
      data: resp.data?.response?.data,
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
 *@param {{quiz_code:string}} param0
 * @returns {Promise<{status:number, text:string, data:{name:string, phone:string, district:string, quiz_code:string, attempted:boolean time_stamp:number}}>}
 * @throws {{error:boolean, status:number, message:string}}
 */
export async function getStudentDetails({ quiz_code }) {
  try {
    const resp = await apiClient.get("/student", {
      params: {
        code: quiz_code,
      },
    });
    return {
      status: resp.status,
      text: resp.statusText,
      data: resp.data?.response?.data,
    };
  } catch (error) {
    throw {
      error: true,
      status: error.response?.status,
      message: "something went wrong",
    };
  }
}
