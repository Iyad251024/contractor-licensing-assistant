export class AppError extends Error {
  constructor(public code: string, message: string, public status = 400) {
    super(message);
  }
}

export const Errors = {
  unauthorized: () => new AppError("unauthorized", "Authentication required", 401),
  forbidden: (msg = "Forbidden") => new AppError("forbidden", msg, 403),
  notFound: (msg = "Not found") => new AppError("not_found", msg, 404),
  badRequest: (msg: string) => new AppError("bad_request", msg, 400),
  planRequired: (plan: string) =>
    new AppError("plan_required", `This feature requires the ${plan} plan or higher`, 402),
  conflict: (msg: string) => new AppError("conflict", msg, 409),
};
