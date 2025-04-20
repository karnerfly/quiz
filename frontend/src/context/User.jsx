import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { getCurrentTeacherDetails, getTeacherQuizzes } from "@src/api";

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} role
 * @property {string|null} created_at
 * @property {string|null} updated_at
 */

/**
 * @typedef {Object} QuizQuestion
 * @property {number} id - The unique identifier for the question
 * @property {string[]} options - Array of answer options
 * @property {string} problem - The question text/problem statement
 * @property {Date} created_at - When the question was created
 * @property {Date} updated_at - When the question was last updated
 */

/**
 * @typedef {Object} Quiz
 * @property {number} id - The unique identifier for the quiz
 * @property {string} title - Title of the quiz
 * @property {string} subject - Subject/category of the quiz
 * @property {boolean} is_negative_marking - Whether negative marking is enabled
 * @property {number} no_of_questions - Total number of questions
 * @property {string} status - Current status of the quiz (e.g., 'draft', 'published')
 * @property {string} share_code - Unique code for sharing the quiz
 * @property {number} total_submissions - Count of total submissions
 * @property {number} duration - Duration in minutes
 * @property {QuizQuestion[]} questions - Array of quiz questions
 * @property {Date} created_at - When the quiz was created
 * @property {Date} updated_at - When the quiz was last updated
 */

/**
 * @typedef {Object} UserContextValue
 * @property {User|null} user - The user object
 * @property {Quiz[]} quizzes - Array of quiz objects
 */
const UserContext = createContext(
  /** @type {UserContextValue} */ ({
    user: null,
    quizzes: [],
  })
);

export const useUser = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("useUser hook must be inside UserProvider");
  }

  return userContext;
};

const UserProvider = ({ children }) => {
  /**
   * @type {[{
   *   id: number,
   *   name: string,
   *   email: string,
   *   phone: string,
   *   role: string,
   *   created_at: string | null,
   *   updated_at: string | null
   * } | null, Function]}
   */
  const [user, setUser] = useState(null);

  /**
   * @type {[{
   * id:number, title:string, subject:string, is_negative_marking:boolean, no_of_questions:number, status:string, share_code:string, total_submissions:number, duration:number, questions:{id:number, options:string[], problem:string, created_at:Date, updated_at:Date}[], created_at:Date, updated_at:Date
   * }[], Function
   * ]}
   */
  const [quizzes, setQuizzes] = useState([]);

  const fetchUser = useCallback(async () => {
    try {
      const resp = await getCurrentTeacherDetails();
      setUser(resp.data);
    } catch (error) {
      console.log(error);
    }
  });

  const fetchTeacherQuizzes = useCallback(async () => {
    try {
      const resp = await getTeacherQuizzes();
      setQuizzes(resp.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
    fetchTeacherQuizzes();
  }, []);

  return (
    <UserContext.Provider value={{ user, quizzes }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
