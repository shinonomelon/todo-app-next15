"use client";

import { useActionState } from "react";

import { addTodo } from "../actions/todo";

import { ActionResponse } from "../types/todo";
import { LoadingSpinner } from "./loading-spinner";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export function TodoForm() {
  const [state, action, isPending] = useActionState(addTodo, initialState);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        新しいTodoを追加
      </h2>
      <form action={action} className="space-y-4">
        <div>
          <input
            type="text"
            name="text"
            minLength={2}
            maxLength={100}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="新しいTodoを入力してください"
          />
          {state.errors?.text && (
            <div className="text-red-500 text-sm mt-1" role="alert">
              {state.errors.text.join(", ")}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {isPending ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
              <span className="ml-2">送信中</span>
            </div>
          ) : (
            "追加"
          )}
        </button>
      </form>
    </div>
  );
}
