import type { NextApiRequest, NextApiResponse } from 'next'
import { CandidateFunctions } from '../../../database/functions/candidate.function'

type Data = {
    value: any,
    isSuccess: boolean
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method === 'POST') {
        const { candidates } = req.body

        const result = await CandidateFunctions.insertMany(candidates)
        return res.status(200).json({ value: result, isSuccess: true })
    } else if (req.method === 'GET') {
        const { page, limit } = req.query

        const result = await CandidateFunctions.populate({
            page: parseInt(page), limit: parseInt(limit),
            sort: {
                createdAt: -1
            },
            populate: {
                path: "scheduleInfo",
                select: "workAddress interviewAddress date note"
            }
        })
        return res.status(200).json({ value: result, isSuccess: true })
    }
    return res.status(200).json({ value: 'John Doe', isSuccess: true })
}
