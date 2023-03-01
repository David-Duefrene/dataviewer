import clientPromise from '../../../util/mongoClient'

import type { NextApiRequest, NextApiResponse } from 'next'

const getBudget = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const client = await clientPromise
		const db = client.db('DataViewer')
		const data = await db
			.collection('Budget')
			.find({ year: parseInt(req.query.year as string) })
			.toArray()

		res.status(200).json(JSON.parse(JSON.stringify(data))[0])
	} catch (e) {
		res.status(500).json({ message: e })
	}
}

export default getBudget
