export class Paths {
  static login = "/app/login";
  static branchList = "/app/branchList";
  static addBranch = "/app/addEditBranch";
  static editBranch = (id: number): string => { return `/app/addEditBranch/${id}`; };
}

export class AppRoutes {
  static login = "login";
  static branchList = "branchList";
  static addBranch = "addEditBranch";
  static editBranch = "addEditBranch/:id";
}
