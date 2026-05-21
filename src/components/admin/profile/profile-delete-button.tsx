'use client';

import { useState, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { deletePhysicianProfile } from '@/actions/physician-profile-actions';

import {
  Dialog,
  DialogContent,
  DialogHeader,
 DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

type Props = {
  id: number;
};

export function PhysicianProfileDeleteButton({
  id,
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deletePhysicianProfile(id);

        toast.success('Profile deleted');

        setOpen(false);

        router.refresh();
      } catch (error) {
        console.error(error);

        toast.error(
          'Failed to delete profile'
        );
      }
    });
  }

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="destructive"
        className="h-10 w-24"
        onClick={() => setOpen(true)}
        disabled={isPending}
      >
        Delete
      </Button>

      {/* Dialog */}
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Delete Profile
            </DialogTitle>

            <DialogDescription>
              This action cannot be undone.
              This will permanently delete
              the physician profile.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending
                ? 'Deleting...'
                : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}