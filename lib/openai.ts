import OpenAI from 'openai';
import { ExtractionResult } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function extractReceiptData(imageUrl: string): Promise<ExtractionResult> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Extract all line items from this receipt. Return a JSON object with:
{
  "supplier_name": "string",
  "receipt_date": "YYYY-MM-DD",
  "receipt_total": number,
  "line_items": [
    {
      "description": "string",
      "quantity": number,
      "unit_price": number,
      "line_total": number
    }
  ]
}

For each line item:
- description: the item name/description
- quantity: number of units purchased
- unit_price: price per unit
- line_total: total for this line item

Return ONLY the JSON object, no additional text.`
          },
          {
            type: 'image_url',
            image_url: {
              url: imageUrl
            }
          }
        ]
      }
    ],
    max_tokens: 2000
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  // Parse JSON from response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to extract JSON from response');
  }

  return JSON.parse(jsonMatch[0]) as ExtractionResult;
}
