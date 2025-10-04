import { NextFunction, Request, Response } from "express";
import { ControllerRead } from "../common/controller/controller-read.interface";
import { ControllerWrite } from "../common/controller/controller-write.interface";
import { Page } from "../shared/types/page.interface";
import { ListBoxFilter } from "../shared/utils/filter-paginate.utils";
import { wrapToSendBackResponse } from "../shared/wrap-to-send-back-response";
import { PaginatedRole, Role } from "./role.model";
import { roleService } from "./role.service";

class RoleController implements ControllerRead, ControllerWrite {
  getPaginatedList(req: Request, res: Response, next: NextFunction): void {
    const { page: pageNo, pageSize, search, ...filter } = req.query;
    const page: Page = {
      page: Number(pageNo),
      pageSize: Number(pageSize),
    };
    wrapToSendBackResponse<PaginatedRole>(
      roleService.getPaginatedList(
        search as string,
        filter as ListBoxFilter,
        page
      ),
      res,
      next
    );
  }

  getAll(_req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Role[]>(roleService.getAll(), res, next);
  }

  getById(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Role | null>(
      roleService.getById(req.params.roleId),
      res,
      next
    );
  }

  create(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Role>(roleService.create(req.body), res, next);
  }

  delete(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<boolean>(
      roleService.delete(req.params.roleId),
      res,
      next
    );
  }

  update(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Role | null>(
      roleService.update(req.params.roleId, req.body),
      res,
      next
    );
  }

  checkDuplication(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<boolean>(
      roleService.checkDuplication(req.body),
      res,
      next
    );
  }
}

export const roleController = new RoleController();
