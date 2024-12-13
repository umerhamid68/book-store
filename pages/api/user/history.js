import { getSessionUserId, getUserHistory, addSearchQuery } from '../../../lib/userUtils';

export default async function handler(req, res) {
    const userId = getSessionUserId(req);

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.method === 'GET') {
        try {
            const history = await getUserHistory(userId);
            res.status(200).json(history);
        } catch (error) {
            console.error('Error fetching user history:', error);
            res.status(500).json({ message: 'Failed to fetch history' });
        }
    } else if (req.method === 'POST') {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ message: 'Query is required' });
        }

        try {
            await addSearchQuery(userId, query);
            res.status(201).json({ message: 'Search query added' });
        } catch (error) {
            console.error('Error adding search query:', error);
            res.status(500).json({ message: 'Failed to add search query' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
