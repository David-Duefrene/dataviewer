import clientPromise from '../../util/mongoClient'

import type { NextApiRequest, NextApiResponse } from 'next'

const getPopulation = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const client = await clientPromise
		const db = client.db('DataViewer')
		const movies = await db
			.collection('population')
			.find({})
			.toArray()

		res.status(200).json(movies)
	} catch (e) {
		res.status(500).json({ message: e })
	}
}

export default getPopulation
