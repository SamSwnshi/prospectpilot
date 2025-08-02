import {db} from '@/lib/db';
import {businessInputs,leads} from '@/lib/dbSchema/schema';
import { MOCK_LEADS } from '@/lib/mockData';


export async function POST(request){
    const body = await request.json();
    const result = await db
    .insert(businessInputs)
    .values({
        name: body.name,
        description: body.description,
        keywords: body.keywords || null,
        location: body.location
    })
    .returning()


    const inputId = result[0].id;

    //mock leads link to business input
    for(const lead of MOCK_LEADS){
        await db.insert(leads).values({
            ...lead,businessInputId: inputId,
            source: 'mock'
        })
    }

    return new Response(JSON.stringify({inputId}),{status: 201})
}