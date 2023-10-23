import { Request, Response } from 'express';


export const sendError = (req: Request, res: Response, statusCode: number, message: string, err?: any) => {
  res.status(statusCode || 500).json({
    success: false,
    message: message || err?.message,
  });
};
