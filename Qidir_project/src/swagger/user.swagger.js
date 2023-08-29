/**
 * @swagger
 * /user/payment:
 *   post:
 *     summary: Change user balance
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: balance
 *         in: formData
 *         description: Amount to change the user's balance
 *         required: true
 *         type: number
 *     responses:
 *       '200':
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             data:
 *               $ref: '#/definitions/User'
 *       '400':
 *         $ref: '#/responses/BadRequest'
 *
 * /user:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/User'
 *       '400':
 *         $ref: '#/responses/BadRequest'
 *
 * /user/statistics:
 *   get:
 *     summary: Get user registration statistics
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: fromDate
 *         in: query
 *         description: Start date for statistics
 *         required: true
 *         type: string
 *         format: date
 *       - name: toDate
 *         in: query
 *         description: End date for statistics
 *         required: true
 *         type: string
 *         format: date
 *     responses:
 *       '200':
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   count:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *       '400':
 *         $ref: '#/responses/BadRequest'
 *
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User information
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewUser'
 *     responses:
 *       '201':
 *         description: Created
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             data:
 *               $ref: '#/definitions/User'
 *       '400':
 *         $ref: '#/responses/BadRequest'
*/