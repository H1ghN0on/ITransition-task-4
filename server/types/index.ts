import express from "express";

export interface IUserRequest extends express.Request {
  user: string; // or any other type
}
