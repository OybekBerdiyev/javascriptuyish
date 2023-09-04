/**
 * @swagger
 * /generate:
 *   post:
 *     summary: Generate a Short URL
 *     description: Generates a short URL for the provided long URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               url:
 *                 type: string
 *                 description: The long URL to be shortened.
 *     responses:
 *       '201':
 *         description: Short URL generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                 url:
 *                   type: string
 *       '500':
 *         description: Internal server error.
 * /{url}:
 *   get:
 *     summary: Access Short URL
 *     description: Redirects to the long URL associated with the provided short URL.
 *     parameters:
 *       - in: path
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *         description: The short URL to access.
 *     responses:
 *       '302':
 *         description: Redirects to the long URL.
 *       '404':
 *         description: Short URL not found.
 *       '500':
 *         description: Internal server error.
 */