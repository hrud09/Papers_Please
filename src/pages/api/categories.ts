import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const categories = await prisma.documentCategory.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  } else if (req.method === 'POST') {
    try {
      const category = await prisma.documentCategory.create({
        data: req.body,
      });
      res.status(201).json(category);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Failed to create category' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, ...data } = req.body;
      const category = await prisma.documentCategory.update({
        where: { id },
        data,
      });
      res.status(200).json(category);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Failed to update category' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      await prisma.documentCategory.delete({
        where: { id },
      });
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Failed to delete category' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 