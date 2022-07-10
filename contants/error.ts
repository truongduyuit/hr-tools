import { ResponseError } from ".";

export const notAuth = () => {
  return new Response(
    JSON.stringify({ success: false, error: NOT_AUTHORIZED }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const LOGIN_ACCOUNT_NOT_EXIST: ResponseError = {
  code: "LOGIN_ACCOUNT_NOT_EXIST",
  message: "Account not exist",
};

export const NOT_AUTHORIZED: ResponseError = {
  code: "NOT_AUTHORIZED",
  message: "Not authorized",
};

export const LOGIN_ACCOUNT_WRONG: ResponseError = {
  code: "LOGIN_ACCOUNT_WRONG",
  message: "Phone or password is wrong",
};

export const SERVICE_CREATE_FAIL: ResponseError = {
  code: "SERVICE_CREATE_FAIL",
  message: "Create service failed",
};

export const SERVICE_EDIT_FAIL: ResponseError = {
  code: "SERVICE_EDIT_FAIL",
  message: "Edit service failed",
};

export const SERVICE_DELETE_FAIL: ResponseError = {
  code: "SERVICE_DELETE_FAIL",
  message: "Edit service failed",
};

export const POST_CREATE_FAIL: ResponseError = {
  code: "POST_CREATE_FAIL",
  message: "Create service failed",
};

export const POST_EDIT_FAIL: ResponseError = {
  code: "POST_EDIT_FAIL",
  message: "Edit service failed",
};

export const POST_DELETE_FAIL: ResponseError = {
  code: "POST_DELETE_FAIL",
  message: "Edit service failed",
};

export const CONTACT_INFO_EDIT_FAIL: ResponseError = {
  code: "CONTACT_INFO_EDIT_FAIL",
  message: "Edit contact info failed",
};

export const CONTACT_INFO_GET_FAIL: ResponseError = {
  code: "CONTACT_INFO_GET_FAIL",
  message: "Get contact info failed",
};

