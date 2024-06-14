import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles";

const Roles = (...roles: Array<string>) => SetMetadata(ROLES_KEY, roles);

export default Roles;
