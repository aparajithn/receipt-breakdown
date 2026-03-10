'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Mock user ID for demo
const DEMO_USER_ID = 'demo-user';

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setError(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      // Upload file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', DEMO_USER_ID);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }

      const { publicUrl } = await uploadResponse.json();

      // Extract data
      setUploading(false);
      setExtracting(true);

      const extractResponse = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: publicUrl,
          userId: DEMO_USER_ID
        })
      });

      if (!extractResponse.ok) {
        throw new Error('Extraction failed');
      }

      const { receipt } = await extractResponse.json();

      // Redirect to receipt detail
      router.push(`/dashboard/${receipt.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setUploading(false);
      setExtracting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload Receipt</h1>
          <p className="text-gray-600 mt-2">
            Upload a photo of your receipt to extract line items
          </p>
        </div>

        <Card className="p-8">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
          >
            {preview ? (
              <div className="space-y-4">
                <img
                  src={preview}
                  alt="Receipt preview"
                  className="max-h-96 mx-auto rounded-lg"
                />
                <div className="flex gap-4 justify-center">
                  <label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-change"
                    />
                    <Button variant="outline" type="button" onClick={() => document.getElementById('file-change')?.click()}>
                      Change Image
                    </Button>
                  </label>
                  <Button
                    onClick={handleSubmit}
                    disabled={uploading || extracting}
                  >
                    {uploading
                      ? 'Uploading...'
                      : extracting
                      ? 'Extracting data...'
                      : 'Process Receipt'}
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-6xl mb-4">📄</div>
                <p className="text-xl font-semibold text-gray-900 mb-2">
                  Drop receipt image here
                </p>
                <p className="text-gray-600 mb-4">or</p>
                <label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-input"
                  />
                  <Button type="button" onClick={() => document.getElementById('file-input')?.click()}>
                    Choose File
                  </Button>
                </label>
                <p className="text-sm text-gray-500 mt-4">
                  Supports JPEG, PNG (max 10MB)
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-semibold">Error</p>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {extracting && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 font-semibold">Processing...</p>
              <p className="text-blue-600">
                AI is extracting line items from your receipt. This may take 10-20 seconds.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
