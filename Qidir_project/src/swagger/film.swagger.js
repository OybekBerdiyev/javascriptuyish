/**
 * @swagger
 * /api/film:
 *   post:
 *     summary: Create a new film
 *     tags: [Film]
 *     security:
 *       - bearerAuth: []
 *     description: Service CRUD APIs.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Oppenheimer
 *                 required: true
 *               description:
 *                 type: string
 *                 example: The film about who created the first atomic bomb
 *                 required: true
 *               year:
 *                 type: integer
 *                 example: 2023
 *                 required: true
 *               price:
 *                 type: number
 *                 required: true
 *               photo:
 *                 type: string
 *                 example: Cover photo
 *                 required: true
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Film'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 * 
 * /api/film/{id}:
 *   get:
 *     summary: Get a film by ID
 *     tags: [Film]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Film'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 * 
 * 
 * /api/film/buy/{id}:
 *   post:
 *     summary: Buy a film
 *     tags: [Film]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: number
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 * 
 * /api/film/update/{id}:
 *   put:
 *     summary: Update a film
 *     tags: [Film]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Oppenheimer
 *                 required: true
 *               title:
 *                 type: string
 *                 example: Updated Title
 *                 required: true
 *               photo:
 *                 type: file
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Film'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 * 
 * /api/film/delete/{id}:
 *   delete:
 *     summary: Delete a film
 *     tags: [Film]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: d0733566-243e-4910-9c81-b52889979d87
 *                     name:
 *                       type: string
 *                       example: Tom
 *                     title:
 *                       type: string
 *                       example: title
 *                     photo:
 *                       type: string
 *                       example: 5ca8c742-5c20-4040-b2ea-99bb5963e93d.png
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 */
