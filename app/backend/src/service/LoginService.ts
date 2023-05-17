import { compareSync } from 'bcryptjs';
import Exception from '../error/Excepion';
import { generateToken, verifyToken } from '../utils/JWT';
import Users from '../database/models/Users';

export default class TeamsService {
  public post = async (email: string, password: string) => {
    const user = await Users.findOne({ where: { email } });
    if (!user || !compareSync(password, user.password)) {
      throw new Exception(401, 'Invalid email or password');
    }
    const token = generateToken({ id: user.id, role: user.role, email: user.email });
    return { type: 200, message: { token } };
  };

  public get = async (token: string) => {
    if (!token) throw new Exception(401, 'Token not found');
    const validToken = verifyToken(token);
    const users = await Users.findOne({ where: { email: validToken.email } });

    return { type: 200, message: { role: users?.role } };
  };
}
