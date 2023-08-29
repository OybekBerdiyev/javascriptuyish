/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register users
 *     tags: [Authification]
 *     description: regester api.
 *     requestBody:
 *        content:
 *          multipart/raw:
 *            schema:
 *              type: object
 *              properties:
 *                 fullname:
 *                   example: Tom
 *                   type: string
 *                   required: true
 *                 username:
 *                    type: string
 *                    example: tom_jerry
 *                    required: true
 *                 password:
 *                   type: string
 *                   example: qwerty
 *                   required: true
 *     responses:
 *       201:
 *         description: Create User.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: succesfull
 *                 data:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTY4ZDFlLWUzNTctNDgzNS05YzM2LTMzMGY3MmEyYjJhNiIsImlhdCI6MTY5MTgyNzA1MSwiZXhwIjoxNjkyMDg2MjUxfQ.YBAK3LZ0ByOTKh7ttBGS9voDtjSjq_zyBHkKbzqArYc
 * /api/auth/login:
 *   post:
 *     summary: Login users
 *     tags: [Authification]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 username:
 *                    type: string
 *                    example: tom_jerry
 *                 password:
 *                   type: string
 *                   example: qwerty
 *     responses:
 *       200:
 *         description: User loggid in.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: succesfull
 *                 data:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTY4ZDFlLWUzNTctNDgzNS05YzM2LTMzMGY3MmEyYjJhNiIsImlhdCI6MTY5MTgyNzA1MSwiZXhwIjoxNjkyMDg2MjUxfQ.YBAK3LZ0ByOTKh7ttBGS9voDtjSjq_zyBHkKbzqArYc
 */